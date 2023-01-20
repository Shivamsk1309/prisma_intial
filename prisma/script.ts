import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

 const main = async () => {
    prisma.propertyListing.create
}

