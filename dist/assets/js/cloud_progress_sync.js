import { supabaseConfig } from './supabase_config.js';
import { Storage } from './storage.js';

const SNAPSHOT_TABLE = 'progress_snapshots';

export class CloudProgressSync {
  constructor() {
    this.client = null;
  }

  configured() {
    return Boolean(supabaseConfig.url && supabaseConfig.anonKey);
  }

  getClient() {
    if (!this.configured()) {
      throw new Error('أكمل رابط مشروع Supabase ومفتاح anon في assets/js/supabase_config.js أولاً.');
    }
    if (!window.supabase?.createClient) {
      throw new Error('تعذر تحميل مكتبة Supabase. تحقق من اتصال الإنترنت ثم أعد تحميل الصفحة.');
    }
    if (!this.client) {
      this.client = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey, {
        auth: {
          flowType: 'pkce',
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storageKey: 'deutschmeister-supabase-auth'
        }
      });
    }
    return this.client;
  }

  async getSession() {
    const { data, error } = await this.getClient().auth.getSession();
    if (error) throw error;
    return data.session;
  }

  async sendMagicLink(email) {
    const client = this.getClient();
    const { error } = await client.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}${window.location.pathname}`
      }
    });
    if (error) throw error;
  }

  async signOut() {
    const { error } = await this.getClient().auth.signOut();
    if (error) throw error;
  }

  async readCloudSnapshot() {
    const client = this.getClient();
    const session = await this.getSession();
    if (!session) throw new Error('سجّل الدخول أولاً.');
    const { data, error } = await client
      .from(SNAPSHOT_TABLE)
      .select('snapshot, revision, updated_at')
      .eq('user_id', session.user.id)
      .maybeSingle();
    if (error) throw error;
    return data;
  }

  async uploadLocalSnapshot(expectedRevision = null) {
    const client = this.getClient();
    const session = await this.getSession();
    if (!session) throw new Error('سجّل الدخول أولاً.');
    const snapshot = Storage.exportProgressBackup();
    const row = {
      user_id: session.user.id,
      snapshot,
      updated_at: new Date().toISOString()
    };

    if (expectedRevision === null) {
      const { error } = await client.from(SNAPSHOT_TABLE).insert({ ...row, revision: 1 });
      if (error?.code === '23505') {
        throw new Error('أنشأ جهاز آخر نسخة سحابية للتو. حدّث حالة السحابة قبل المحاولة.');
      }
      if (error) throw error;
      return { revision: 1, updatedAt: row.updated_at };
    }

    const { data, error } = await client
      .from(SNAPSHOT_TABLE)
      .update({
        snapshot,
        updated_at: row.updated_at,
        revision: expectedRevision + 1
      })
      .eq('user_id', session.user.id)
      .eq('revision', expectedRevision)
      .select('revision, updated_at')
      .maybeSingle();
    if (error) throw error;
    if (!data) {
      throw new Error('تغيرت النسخة السحابية من جهاز آخر. حدّث حالة السحابة لتجنب استبدال بيانات أحدث.');
    }
    return { revision: data.revision, updatedAt: data.updated_at };
  }

  async restoreCloudSnapshot(expectedRevision) {
    const cloud = await this.readCloudSnapshot();
    if (!cloud) throw new Error('لا توجد نسخة سحابية لهذا الحساب حتى الآن.');
    if (cloud.revision !== expectedRevision) {
      throw new Error('تغيرت النسخة السحابية أثناء التأكيد. حدّث حالة السحابة ثم أعد المحاولة.');
    }
    const result = Storage.replaceProgressBackup(cloud.snapshot);
    return { ...result, updatedAt: cloud.updated_at, revision: cloud.revision };
  }
}
