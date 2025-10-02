// MongoDB initialization script
db = db.getSiblingDB('alelunapaint');

// Create application user
db.createUser({
  user: 'app_user',
  pwd: 'app_password',
  roles: [
    {
      role: 'readWrite',
      db: 'alelunapaint'
    }
  ]
});

// Create indexes for better performance
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "isActive": 1 });

db.contents.createIndex({ "isActive": 1 });
db.contents.createIndex({ "updatedAt": -1 });
db.contents.createIndex({ "lastModifiedBy": 1 });

db.contentbackups.createIndex({ "originalId": 1, "backedUpAt": -1 });
db.contentbackups.createIndex({ "backedUpAt": 1 }, { expireAfterSeconds: 7776000 }); // 90 days

print('Database initialized successfully!');