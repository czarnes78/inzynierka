import { createClient } from 'npm:@supabase/supabase-js@2.89.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Create admin user
    const { data: adminUser, error: adminError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@travel.com',
      password: 'admin123',
      email_confirm: true,
      user_metadata: {
        name: 'Administrator',
      },
    });

    if (adminError) {
      throw new Error(`Failed to create admin: ${adminError.message}`);
    }

    // Create admin profile
    const { error: adminProfileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: adminUser.user.id,
        email: 'admin@travel.com',
        name: 'Administrator',
        role: 'admin',
      });

    if (adminProfileError) {
      throw new Error(`Failed to create admin profile: ${adminProfileError.message}`);
    }

    // Create regular user
    const { data: regularUser, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'user@travel.com',
      password: 'user123',
      email_confirm: true,
      user_metadata: {
        name: 'Test User',
      },
    });

    if (userError) {
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    // Create user profile
    const { error: userProfileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
        id: regularUser.user.id,
        email: 'user@travel.com',
        name: 'Test User',
        role: 'client',
      });

    if (userProfileError) {
      throw new Error(`Failed to create user profile: ${userProfileError.message}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Test users created successfully',
        users: [
          { email: 'admin@travel.com', password: 'admin123', role: 'admin' },
          { email: 'user@travel.com', password: 'user123', role: 'client' },
        ],
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});