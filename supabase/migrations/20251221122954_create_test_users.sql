/*
  # Create Test Users for Development

  1. Users Created
    - Admin User
      - Email: admin@travel.com
      - Password: admin123
      - Role: admin
    
    - Regular User
      - Email: user@travel.com
      - Password: user123
      - Role: client

  2. Notes
    - These are test accounts for development purposes
    - Passwords are simple for easy testing
    - Both accounts are immediately usable for login
*/

-- Insert admin user
DO $$
DECLARE
  admin_id uuid;
  user_id uuid;
BEGIN
  -- Create admin account
  admin_id := extensions.uuid_generate_v4();
  
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    admin_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@travel.com',
    crypt('admin123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
  );

  -- Create admin profile
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (admin_id, 'admin@travel.com', 'Administrator', 'admin');

  -- Create regular user account
  user_id := extensions.uuid_generate_v4();
  
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    created_at,
    updated_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role
  ) VALUES (
    user_id,
    '00000000-0000-0000-0000-000000000000',
    'user@travel.com',
    crypt('user123', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    'authenticated',
    'authenticated'
  );

  -- Create user profile
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (user_id, 'user@travel.com', 'Test User', 'client');
END $$;