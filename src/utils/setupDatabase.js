import { supabase } from '../supabase';

// Function to check if the poketeam table exists and create it if it doesn't
export async function setupDatabase() {
  try {
    // First check if the table exists by trying to retrieve a record
    const { error } = await supabase
      .from('pokemonteam')
      .select('id')
      .limit(1);
    
    // If the error indicates that the table doesn't exist, create it
    if (error && error.code === '42P01') { // PostgreSQL code for undefined_table
      console.log('poketeam table does not exist. Creating it now...');
      
      // Create the table using Supabase SQL (requires database access)
      // Since we can't execute arbitrary SQL via the JS client without elevated permissions,
      // we'll inform the user to create it manually
      
      console.warn(`
        The 'poketeam' table needs to be created in your Supabase dashboard.
        
        1. Go to https://app.supabase.com and log in
        2. Select your project
        3. Go to the SQL Editor
        4. Run the following SQL:
        
        CREATE TABLE IF NOT EXISTS poketeam (
          id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
          name TEXT NOT NULL,
          species TEXT NOT NULL, 
          type TEXT NOT NULL,
          level INTEGER NOT NULL,
          category TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Add Row Level Security Policies
        ALTER TABLE poketeam ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Allow anonymous read access" ON poketeam FOR SELECT USING (true);
        CREATE POLICY "Allow anonymous insert access" ON poketeam FOR INSERT WITH CHECK (true);
        CREATE POLICY "Allow anonymous update access" ON poketeam FOR UPDATE USING (true);
        CREATE POLICY "Allow anonymous delete access" ON poketeam FOR DELETE USING (true);
      `);
      
      return {
        success: false,
        message: 'Table does not exist. Please create it manually in Supabase.'
      };
    }
    
    return { 
      success: true,
      message: 'Database is ready'
    };
  } catch (error) {
    console.error('Error setting up database:', error);
    return {
      success: false,
      message: `Database setup error: ${error.message || error}`
    };
  }
}
