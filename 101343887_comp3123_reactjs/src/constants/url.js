const URLComponent = {
	serverAddress: "localhost",
	portNumber: "3001" 
}

const Endpoints = {

	base: `http://${URLComponent.serverAddress}:${URLComponent.portNumber}`,
	employees: {
		base: "/api/emp/employees/",
		readAll: "",
		createNew: "add",
		view: "view",
		update: "edit"
	},
	user: {
		base: "/api/user/",
		login: "signin",
		signUp: "signup"
	}
}

module.exports = Endpoints