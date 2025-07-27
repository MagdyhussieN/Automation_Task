const dataService = require('../services/dataService');
const bcrypt = require('bcryptjs');

async function addUser(email, password, name) {
    try {
        // Check if user already exists
        const existingUser = await dataService.findUserByEmail(email);
        if (existingUser) {
            console.log('❌ User already exists with this email');
            return;
        }

        // Hash password if bcrypt is being used
        const hashedPassword = password; // For now, using plain text as per current setup
        // const hashedPassword = await bcrypt.hash(password, 10); // Uncomment to use bcrypt

        const newUser = await dataService.addUser({
            email,
            password: hashedPassword,
            name
        });

        console.log('✅ User added successfully:');
        console.log(`   ID: ${newUser.id}`);
        console.log(`   Email: ${newUser.email}`);
        console.log(`   Name: ${newUser.name}`);
    } catch (error) {
        console.error('❌ Error adding user:', error);
    }
}

// Command line usage
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length < 3) {
        console.log('Usage: node addUser.js <email> <password> <name>');
        console.log('Example: node addUser.js john@example.com password123 "John Doe"');
        process.exit(1);
    }

    const [email, password, name] = args;
    addUser(email, password, name);
}

module.exports = { addUser }; 