-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "property";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "review";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user";

-- CreateTable
CREATE TABLE "property"."propertyListing" (
    "id" TEXT NOT NULL,
    "propertyName" TEXT NOT NULL,
    "cashBack" INTEGER NOT NULL,
    "carpetArea" INTEGER NOT NULL,
    "numberOfBeds" INTEGER NOT NULL,
    "numberOfBaths" INTEGER NOT NULL,
    "numberOfBalconies" INTEGER NOT NULL,
    "estateDescription" TEXT NOT NULL,
    "dateListed" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "propertyType" TEXT NOT NULL,
    "constructedDate" TIMESTAMP(3) NOT NULL,
    "postalCode" INTEGER NOT NULL,

    CONSTRAINT "propertyListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property"."location" (
    "id" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,
    "propertyListingId" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property"."brochure" (
    "id" SERIAL NOT NULL,
    "brochurePath" TEXT NOT NULL,
    "propertyListingId" TEXT NOT NULL,

    CONSTRAINT "brochure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property"."imagesAndVideos" (
    "id" SERIAL NOT NULL,
    "imageOrVidPath" TEXT NOT NULL,
    "propertyListingId" TEXT NOT NULL,

    CONSTRAINT "imagesAndVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "social" JSONB,
    "mobNumber" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review"."review" (
    "id" SERIAL NOT NULL,
    "reviewText" TEXT NOT NULL,
    "starRating" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_propertyListingId_key" ON "property"."location"("propertyListingId");

-- CreateIndex
CREATE UNIQUE INDEX "brochure_propertyListingId_key" ON "property"."brochure"("propertyListingId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_social_key" ON "user"."User"("social");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobNumber_key" ON "user"."User"("mobNumber");

-- AddForeignKey
ALTER TABLE "property"."location" ADD CONSTRAINT "location_propertyListingId_fkey" FOREIGN KEY ("propertyListingId") REFERENCES "property"."propertyListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property"."brochure" ADD CONSTRAINT "brochure_propertyListingId_fkey" FOREIGN KEY ("propertyListingId") REFERENCES "property"."propertyListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property"."imagesAndVideos" ADD CONSTRAINT "imagesAndVideos_propertyListingId_fkey" FOREIGN KEY ("propertyListingId") REFERENCES "property"."propertyListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review"."review" ADD CONSTRAINT "review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
