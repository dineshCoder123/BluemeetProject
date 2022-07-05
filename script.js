const AppSumoCodes = require("./models/appSumoCodesModel");
const { v4: uuidv4 } = require("uuid");

const GenerateCodes = async () => {
  try {
    await AppSumoCodes.create({
      code: uuidv4(10),
    });
    console.log("Successfully created code!");
  } catch (error) {
    console.log(error);
  }
};

for (let i = 0; i <= 10; i++) {
  GenerateCodes();
}
