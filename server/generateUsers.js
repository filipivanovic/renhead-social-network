module.exports = function() {
	const { faker } = require('@faker-js/faker')
	const _ = require('lodash')
	return {
		users: _.times(100, function(n) {
			console.log(faker)
			return {
				userId: n,
				name: faker.name.fullName(),
				avatar: faker.internet.avatar(),
				birthdate: faker.date.birthdate(),
				username: faker.internet.userName(),
				email: faker.internet.email(),
				company: faker.company.companyName(),
			}
		}),
	}
}
