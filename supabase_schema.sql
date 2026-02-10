
-- 1. Criar a tabela de Leads
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    status TEXT DEFAULT 'Novo Lead' NOT NULL,
    notes TEXT,
    
    -- Constraint para garantir que o status seja um dos esperados pelo CRM
    CONSTRAINT leads_status_check CHECK (status IN ('Novo Lead', 'Em Atendimento', 'Consulta Marcada', 'Desistente'))
);

-- 2. Habilitar o Row Level Security (RLS)
-- Isso impede o acesso não autorizado aos dados
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- 3. Criar Políticas de Segurança (Policies)

-- Política: Permitir que QUALQUER PESSOA insira um lead (público)
-- Necessário para que o formulário da Landing Page funcione sem login
CREATE POLICY "Enable insert for everyone" 
ON public.leads 
FOR INSERT 
WITH CHECK (true);

-- Política: Permitir que apenas USUÁRIOS AUTENTICADOS vejam os leads
-- Protege a lista de clientes para que apenas o admin veja
CREATE POLICY "Enable select for authenticated users only" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (true);

-- Política: Permitir que apenas USUÁRIOS AUTENTICADOS atualizem os leads
-- Necessário para o admin mudar o status do lead
CREATE POLICY "Enable update for authenticated users only" 
ON public.leads 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Política: Permitir que apenas USUÁRIOS AUTENTICADOS deletem leads
CREATE POLICY "Enable delete for authenticated users only" 
ON public.leads 
FOR DELETE 
TO authenticated 
USING (true);

-- 4. Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

-- Instruções Adicionais:
-- O Supabase Auth já gerencia a tabela de usuários (auth.users).
-- Para criar o primeiro usuário administrador, acesse o menu "Authentication" -> "Users" -> "Add User" no painel do Supabase.
