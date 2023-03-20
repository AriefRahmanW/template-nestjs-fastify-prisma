import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
// initialize the Prisma Client
const prisma = new PrismaClient();

async function main() {

    const saltOrRounds = 10;
    const password = process.env.SUPER_ADMIN_PASSWORD;
    const hashedPassowrd = await bcrypt.hash(password, saltOrRounds);

    const superAdminRole = await prisma.role.upsert({
        where: {
            name: "super_admin"
        },
        update: {},
        create: {
            name: "super_admin",
            user: {
                create: {
                    email: "superadmin@satusehat.com",
                    fullname: "Satu Sehat Super Admin",
                    password: hashedPassowrd
                },
            }
        }
    })
    // const superAdmin = await prisma.user.upsert({
    //     where: {
    //         email: "superadmin@satusehat.com"
    //     },
    //     update: {},
    //     create: {
    //         email: "superadmin@satusehat.com",
    //         password: ""
    //     }
    // })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })