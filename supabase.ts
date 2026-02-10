
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zkkjwqotyvnnwkbageee.supabase.co';
const supabaseKey = 'sb_publishable_ZL8lHFmy8te7jpKQ4M9Ncw_WulQQnIe';

export const supabase = createClient(supabaseUrl, supabaseKey);
