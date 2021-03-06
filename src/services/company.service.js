const { getData } = require("../utils/functions");
const userService = require("./user.service");

module.exports = {
  /* async resolvePromisesForCompanies(id) {
     const companies = getData("company.json");

    const companiesWithUsers = companies.map(async (company) => {
      const employees = await Promise.all(
        company.employees.map((employee) =>
          userService.getUserById(employee.id)
        )
      );
      const owner = await userService.getUserById(company.owner.id);

      return { ...company, employees, owner };
    });
    const response = await Promise.all(companiesWithUsers);

    try {
      if (id) {
        const company = response.find((item) => item.id === Number(id));
        return company;
      }

      return response;
    } catch (error) {
      return { err: error.message };
    }

  },*/

  async getUserById(id) {
    const users = getData("company.json");
    try {
      const user = users.find((item) => item.id === Number(id));

      if (!user) {
        throw new Error("Não possui usuário na lista com esse id");
      }
      return user;
    } catch (error) {
      console.log(error.message);
      return { error: error.message };
    }
  },
};
