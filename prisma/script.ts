import { PrismaClient } from '@prisma/client'
import { timeStamp } from 'console'
import { getMaxListeners } from 'process'
const prisma = new PrismaClient()
//import { v4 as uuidv4 } from 'uuid'
const { v1: uuidv4 } = require('uuid');


// Create a new property listing
async function createPropertyListing() {
  const newPropertyListing = await prisma.propertyListing.create({
    data: {
      id: uuidv4(),
      propertyName: "New Property",
      cashBack: 100,
      carpetArea: 1000,
      numberOfBeds: 3,
      numberOfBaths: 2,
      numberOfBalconies: 1,
      estateDescription: "Beautiful Property with great view",
      price: 2000000,
      propertyType: "Apartment",
      constructedDate: new Date(),
      postalCode: 123456,
      location: {
        create: {
          id: uuidv4(),
          latitude: 12.345678,
          longitude: 98.765432,
          
        }
      },
      imagesAndVideos: {
        create: 
          {
            id: uuidv4(),
            imageOrVidPath: "path/to/image1",
          
          },
        },
         
      brochure: {
        create: {
          id: uuidv4(),
          brochurePath: "path/to/brochure",
          
        }
      },
     
    }
  })
  console.log(newPropertyListing)
  return newPropertyListing
}

//update property
async function updatePropertyListing(id: string) {
    const updatedPropertyListing = await prisma.propertyListing.update({
      where: {
        id
      },
      data: {
        propertyName: "Updated Property",
        cashBack: 200,
        location: {
          update: {
            latitude: 45.67890,
            longitude: -12.34567
          }
        },
        imagesAndVideos: {
          update: [
            {
              where: {
                id: "existing-image-id-1"
              },
              data: {
                imageOrVidPath: "path/to/updated-image1"
              }
            },
            {
              where: {
                id: "existing-image-id-2"
              },
              data: {
                imageOrVidPath: "path/to/updated-image2"
              }
            }
          ]
        },
        brochure: {
          update: {
            where: {
              id: "existing-brochure-id"
            },
            data: {
              brochurePath: "path/to/updated-brochure"
            }
          }
        },
        review: {
          update: [
            {
              where: {
                id: "existing-review-id-1"
              },
              data: {
                reviewText: "Great property, updated",
                starRating: 4.7
              }
            },
            {
              where: {
                id: "existing-review-id-2"
              },
              data: {
                reviewText: "Amazing view, updated",
                starRating: 5.1
              }
            }
          ]
        }
      }
    })
    console.log(updatedPropertyListing)
    return updatedPropertyListing
  }
  
  // Delete a property listing by id
  async function deletePropertyListing(id: string) {
    await prisma.propertyListing.delete({
      where: {
        id
      }
    })
    console.log(`Property Listing with id ${id} deleted`)
  }


  // Create a new user
async function createUser() {
    const newUser = await prisma.user.create({
      data: {
        email: "newuser@example.com",
        isAdmin: false,
        firstName: "John",
        lastName: "Doe",
        mobNumber: 1234567890,
    
      }
    })
    console.log(newUser)
    return newUser
  }


  // Get a user by id
async function getUser(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    })
    console.log(user)
    return user
  }
  
// Update a user by id
async function updateUser(id: number) {
    const updatedUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        email: "updateduser@example.com",
        isAdmin: true,
        reviews: {
          update: [
            {
              where: {
                id: "existing-review-id-1"
              },
              data: {
                reviewText: "Great property, updated",
                starRating: 4.7
              }
            },
            {
              where: {
                id: "existing-review-id-2"
              },
              data: {
                reviewText: "Amazing view, updated",
                starRating: 5.1
              }
            }
          ]
        }
      }
    })
    console.log(updatedUser)
    return updatedUser
  }
  
  // Delete a user by id
  async function deleteUser(id: number) {
    await prisma.user.delete({
      where: {
        id
      }
    })
    console.log(`User with id ${id} deleted`)
  }
  
  // Create a new review
  async function createReview() {
    const newReview = await prisma.review.create({
      data: {
        id: uuidv4(),
        reviewText: "Great property",
        starRating: 4.5,
        review: {
          connect: {
            id: "existing-user-id"
          }
        },
        property: {
          connect: {
            id: "existing-property-id"
          }
        }
      }
    })
    console.log(newReview)
    return newReview
  }
  
  async function getReview(id:number) {
    try {
      const review = await prisma.review.findUnique({
        where: {
          id 
        }
      });
      console.log(review);
      return review;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

    
    // Update a review by id
    async function updateReview(id: number) {
      const updatedReview = await prisma.review.update({
        where: {
          id
        },
        data: {
          reviewText: "Great property, updated",
          starRating: 4.7
        }
      })
      console.log(updatedReview)
      return updatedReview
    }
    
    // Delete a review by id
    async function deleteReview(id: string) {
      await prisma.review.delete({
        where: {
          id : 15
        }
      })
      console.log(`Review with id ${id} deleted`)
    }
    
    // Create a new location
    async function createLocation() {
      const newLocation = await prisma.location.create({
        data: {
          id: uuidv4(),
          latitude: 12.345678,
          longitude: 98.765432,
          propertyId: {
            connect: {
              id: "existing-property-id"
            }
          }
        }
      })
      console.log(newLocation)
      return newLocation
    }
    // Get a location by id
async function getLocation(id: string) {
  const location = await prisma.location.findUnique({
    where: {
      id
    }
  })
  console.log(location)
  return location
}

// Update a location by id
async function updateLocation(id: string) {
  const updatedLocation = await prisma.location.update({
    where: {
      id
    },
    data: {
      latitude: 45.67890,
      longitude: -12.34567
    }
  })
  console.log(updatedLocation)
  return updatedLocation
}
