import { PrismaClient, roles } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

const client = new PrismaClient();

const main = async () => {
  await client.productionProfiles.deleteMany();
  await client.user.deleteMany();
  await client.prev_projects.deleteMany();

  const hashedPasswored = await hash("test1234", 12);

  for (let i = 0; i < 20; i++) {
    const roles = ["ARTIST", "PROD_OWNER"];
    const techroles = [
      "Camera Man",
      "Director",
      "Editor",
      "Muscian",
      "Voice Artist",
      "Actor",
    ];
    const randomIndex = Math.floor(Math.random() * roles.length);
    await client.user.create({
      data: {
        name: faker.name.fullName(),
        image: faker.image.avatar(),
        address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.zipCode()}`,
        age: parseInt(faker.random.numeric(2)),
        date_of_birth: faker.date.past().getUTCDate().toString(),
        email: faker.internet.email(),
        expected_payment: faker.datatype.boolean(),
        id_proof: faker.image.people(),
        password: hashedPasswored,
        phone_no: faker.phone.number("+91 ##### #####"),
        physical_details: "Eye Color - Brown",
        role_type: roles[randomIndex] as roles,
        skills: new Array(faker.datatype.number({ min: 1, max: 8 })).fill(
          faker.random.word()
        ),
        as: faker.helpers.arrayElement(techroles),
        about: faker.lorem.paragraph(4),
      },
    });
  }

  const prod_owners = await client.user.findMany({
    where: {
      role_type: "PROD_OWNER",
    },
  });

  await Promise.all(
    prod_owners.map(async (prod_owner) => {
      await client.productionProfiles.create({
        data: {
          address: `${faker.address.streetAddress()}, ${faker.address.cityName()}, ${faker.address.zipCode()}`,
          budget: parseInt(faker.finance.amount(8)),
          no_of_shooting_days: parseInt(faker.random.numeric(1)),
          artistsId: prod_owner.id,
          payment_provided: faker.datatype.boolean(),
          poster: faker.image.abstract(640, 480, true),
          release_date: faker.date.future(2),
          restrictions: `No Smoking, No alcl`,
          title: faker.lorem.word(2),
          gener_on_prod: new Array(
            faker.datatype.number({ min: 1, max: 7 })
          ).fill(faker.word.adverb()),
        },
      });
    })
  );
};

main()
  .then(() => {
    console.log("the file is successfully seeded🎉");
  })
  .catch((e) => {
    console.log(e);
  });
