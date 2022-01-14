import { createClient } from '@supabase/supabase-js';
import variables from '../../variables';

const supabase = createClient(variables.supabaseURL, variables.supabaseKey);

export default supabase;
