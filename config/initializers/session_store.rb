# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_extonrails_session',
  :secret      => 'a063a72e5f4467830fbb2dff36eac20a3e4d2c9e57219a2e46dd6256bae55d235876e493af5da53c104c472c288552348659d61d7a02c7daacd5f7748d2e721a'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
