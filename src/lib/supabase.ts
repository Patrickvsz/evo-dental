// Modo Mock - Simulação completa do Supabase para desenvolvimento
const MOCK_MODE = !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Mock do cliente Supabase
const mockSupabaseClient = {
  from: (table: string) => ({
    insert: (data: any) => Promise.resolve({ data, error: null }),
    select: (columns?: string) => ({
      eq: (column: string, value: any) => Promise.resolve({ data: [], error: null }),
      order: (column: string, options?: any) => Promise.resolve({ data: [], error: null }),
      limit: (count: number) => Promise.resolve({ data: [], error: null })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => Promise.resolve({ data, error: null })
    }),
    delete: () => ({
      eq: (column: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  }),
  rpc: (functionName: string, params?: any) => Promise.resolve({ data: null, error: null }),
  auth: {
    signUp: (credentials: any) => Promise.resolve({ data: { user: null }, error: null }),
    signIn: (credentials: any) => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null })
  }
};

// Cliente real do Supabase (apenas se as variáveis estiverem configuradas)
let realSupabaseClient: any = null;

if (!MOCK_MODE) {
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    realSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    console.warn('Supabase não configurado, usando modo mock');
  }
}

// Exporta o cliente (mock ou real)
export const supabase = MOCK_MODE ? mockSupabaseClient : realSupabaseClient;

// Função para inicializar as tabelas do banco (modo mock não faz nada)
export const initializeDatabase = async () => {
  if (MOCK_MODE) {
    console.log('Modo mock ativo - banco de dados simulado');
    return;
  }

  try {
    // Criar tabela de usuários
    await supabase.rpc('create_users_table', {});
    
    // Criar tabela de clínicas
    await supabase.rpc('create_clinics_table', {});
    
    // Criar tabela de agendamentos
    await supabase.rpc('create_appointments_table', {});
    
    // Criar tabela de avaliações
    await supabase.rpc('create_ratings_table', {});
    
    // Criar tabela de mensagens
    await supabase.rpc('create_messages_table', {});
    
    // Criar tabela de indicações
    await supabase.rpc('create_referrals_table', {});
    
    // Criar tabela de cliques em clínicas
    await supabase.rpc('create_clinic_clicks_table', {});
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Função para gerar código de indicação único
export const generateReferralCode = (name: string): string => {
  const cleanName = name.replace(/\s+/g, '').toUpperCase();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${cleanName.slice(0, 3)}${randomNum}`;
};

// Função para registrar clique em clínica (modo mock simula sucesso)
export const registerClinicClick = async (userId: string, clinicId: string, appointmentId: string) => {
  if (MOCK_MODE) {
    console.log(`Mock: Clique registrado - Usuário: ${userId}, Clínica: ${clinicId}`);
    return true;
  }

  try {
    const { error } = await supabase
      .from('clinic_clicks')
      .insert({
        user_id: userId,
        clinic_id: clinicId,
        appointment_id: appointmentId,
        clicked_at: new Date().toISOString()
      });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error registering clinic click:', error);
    return false;
  }
};

// Função para verificar se está em modo mock
export const isMockMode = () => MOCK_MODE;

// Log do modo atual
if (typeof window !== 'undefined') {
  console.log(MOCK_MODE ? '🔧 Evo Dental rodando em MODO MOCK (sem Supabase)' : '🔗 Evo Dental conectado ao Supabase');
}