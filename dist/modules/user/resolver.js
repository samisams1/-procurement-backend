"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const apollo_server_1 = require("apollo-server");
const model_1 = __importDefault(require("./model"));
const verificationService_1 = require("../verification/verificationService");
const mailerService_1 = require("../mailer/mailerService");
const supplier_1 = require("../supplier");
const multer_1 = __importDefault(require("multer"));
const fs_1 = require("fs");
const model_2 = __importDefault(require("../company/model"));
const verificationService = new verificationService_1.VerificationService();
const mailerService = new mailerService_1.MailerService();
// Set up Multer storage configuration
// Define the storage configuration
// Configure Multer storage
// Configure Multer storage
// Configure Multer storage
// Configure Multer storage
// Configure Multer storage
const storage = multer_1.default.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
// Create Multer instance
const upload = (0, multer_1.default)({ storage });
const userResolver = {
    Query: {
        users: async () => {
            // Retrieve all suppliers
            try {
                const users = await model_1.default.findAll();
                return users;
            }
            catch (error) {
                console.error('Failed to fetch suppliers:', error);
                throw new Error('Failed to fetch suppliers');
            }
        },
    },
    Mutation: {
        createUser: async (_, { input }) => {
            try {
                const { username, phoneNumber, email, password, firstName, lastName, role, companyName, category, country, city } = input;
                const newUsername = username.toLowerCase();
                const hashedPassword = await bcrypt_1.default.hash(password, 10);
                const address = country + city;
                // Check if the username already exists
                const existingUserByUsername = await model_1.default.findOne({ where: { username: newUsername } });
                if (existingUserByUsername) {
                    throw new apollo_server_1.ApolloError('Username already exists', 'USERNAME_EXISTS');
                }
                // Check if the email already exists
                const existingUserByEmail = await model_1.default.findOne({ where: { email } });
                if (existingUserByEmail) {
                    throw new apollo_server_1.ApolloError('Email already exists', 'EMAIL_EXISTS');
                }
                // Validate email format
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    throw new apollo_server_1.ApolloError('Invalid email format', 'INVALID_EMAIL_FORMAT');
                }
                // Password strength validation
                /*  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{6,}$/;
                  if (!passwordRegex.test(password)) {
                    throw new ApolloError('Password should be at least 6 characters long and contain at least one special character and one number', 'INVALID_PASSWORD');
                  }*/
                const validatedRole = role;
                if (validatedRole !== 'ADMIN' && validatedRole !== 'CUSTOMER' && validatedRole !== 'SUPPLIER') {
                    throw new apollo_server_1.ApolloError('Invalid role', 'INVALID_ROLE');
                }
                const user = await model_1.default.create({
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    status: 'ACTIVE',
                    username: newUsername,
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phoneNumber,
                    address: address,
                    role: validatedRole,
                    isVerified: false,
                });
                // Retrieve the generated id using the get method
                const userId = user.get('id');
                const verificationToken = await verificationService.createVerificationToken(Number(userId));
                const verificationUrl = `https://et-proforma.netlify.app/verify?token=${verificationToken}`;
                await mailerService.sendVerificationEmail(email, verificationUrl, username, password, firstName, lastName);
                const emailSent = true;
                await model_2.default.create({
                    name: companyName,
                    userId: Number(userId),
                });
                if (role === "SUPPLIER" && companyName) {
                    // Create a new Supplier record with the userId set to the id of the created User
                    await supplier_1.Supplier.create({
                        name: companyName,
                        userId: Number(userId),
                        categoryId: Number(category),
                    });
                }
                if (!emailSent) {
                    throw new apollo_server_1.ApolloError('Failed to send verification email', 'EMAIL_SEND_ERROR');
                }
                return user;
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_1.ApolloError(error);
            }
        },
        /*uploadProfilePicture: async(parent: any, { userId, file }: { userId: number, file: any }) => {
          try {
            const uploadMiddleware = promisify(upload.single('file'));
        
            const req: any = {
              headers: {
                'Content-Type': 'multipart/form-data', // Example header
                // Add any other required headers
              },
              // Add any other required properties
            };
        
            const res: any = {
              send: (data: any) => {
                // Implement the logic to send the response with the provided data
                // ...
              },
              status: (statusCode: number) => {
                // Implement the logic to set the status code of the response
                // ...
                return res; // Return `res` to allow chaining of methods
              },
              // Add any other required methods or properties
            };
        
            await uploadMiddleware(req, res);
        
            const { originalname, mimetype } = file;
            const uniqueFileName = `${Date.now()}-${originalname}`;
            const path = `./uploads/${uniqueFileName}`;
        
            const writeStream = fs.createWriteStream(path);
        
            await new Promise((resolve, reject) => {
              writeStream.on('finish', resolve);
              writeStream.on('error', reject);
              file.buffer.pipe(writeStream);
            });
        
            await User.update(
              { profilepicture: uniqueFileName },
              { where: { id: userId } }
            );
        
            return User.findByPk(userId);
          } catch (error) {
            console.error('Error uploading profile picture:', error);
            throw new Error('Failed to upload profile picture');
          }
        } */
        uploadProfilePicture: async (req, res, next) => {
            try {
                await new Promise((resolve, reject) => {
                    upload.single('file')(req, res, (err) => {
                        if (err)
                            reject(err);
                        resolve();
                    });
                });
                if (!req.file) {
                    throw new Error('No file uploaded.');
                }
                const { originalname, mimetype, path } = req.file;
                // Use createReadStream to read the file
                const fileStream = (0, fs_1.createReadStream)(path);
                // Perform any necessary operations with the file stream
                // For example, you can pipe it to another writable stream or process it further
                console.log(`File '${originalname}' uploaded and processed successfully`);
                res.status(200).json({ message: 'File uploaded successfully' });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Failed to upload and process file' });
            }
        },
        /*  uploadProfilePicture: async (_:any, { file }: { file: Promise<{ createReadStream: () => NodeJS.ReadableStream, filename: string }> }) => {
            try {
              const { createReadStream, filename } = await file;
      
      
              // Implement the file upload logic here
              const uniqueFileName = `${Date.now()}-${filename}`;
              const path = `./uploads/${uniqueFileName}`;
      
              const writeStream = fs.createWriteStream(path);
      
              await new Promise((resolve, reject) => {
                createReadStream()
                  .pipe(writeStream)
                  .on('finish', resolve)
                  .on('error', (error) => {
                    fs.unlinkSync(path);
                    reject(error);
                  });
              });
      
              return 'Profile picture uploaded successfully';
            } catch (error) {
              console.error('Error uploading profile picture:', error);
              throw new Error('Failed to upload profile picture');
            }
          }, */
        // Create the multer middleware using the storage configuration
        /*uploadProfilePicture: async (_: any, { file }: { file: any }, req: Request, res: Response) => {
          try {
            const { filename, encoding } = file;
        
            // Handle file upload using multer
            await new Promise<void>((resolve, reject) => {
              upload.single('file')(req, res, (err: any) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
        
            if (!filename) {
              throw new Error('File upload failed. File not found.');
            }
        
            // Update the user's profile picture in the database
            await User.update(
              { profilepicture: filename },
              { where: { id: 1 } }
            );
        
            // Return the updated user object
            const updatedUser = await User.findByPk(1);
            return updatedUser;
          } catch (error) {
            console.error('Error uploading profile picture:', error);
            throw new Error('Failed to upload profile picture');
          }
        }*/
        /* uploadProfilePicture: async (_:any, { file }: { file: FileUpload }, req: Request, res: Response) => {
           try {
             const { filename, encoding } = file;
         
             // Handle file upload using multer
             await new Promise<void>((resolve, reject) => {
               upload.single('file')(req, res, (err: any) => {
                 if (err) {
                   reject(err);
                 } else {
                   resolve();
                 }
               });
             });
         
             // Update the user's profile picture in the database
             await User.update(
               { profilepicture: filename },
               { where: { id: 1 } }
             );
         
             // Return the updated user object
             return User.findByPk(1);
           } catch (error) {
             console.error('Error uploading profile picture:', error);
             throw new Error('Failed to upload profile picture');
           }
         }    */
        /*uploadProfilePicture: async (_: any, { file }: { file: { createReadStream:
           () => ReadStream, filename: string, mimetype: string, encoding: string } }) => {
          try {
            const { createReadStream, filename, mimetype } = await file;
            const uniqueFileName = `${Date.now()}-${filename}`;
            const filePath = path.join('./uploads', uniqueFileName);
            await new Promise<void>((resolve, reject) => {
              const uploadMiddleware = upload.single('file');
              const req = {} as any; // Create a mock request object
              const res = {} as any; // Create a mock response object
    
              uploadMiddleware(req, res, (err: any) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
    
     
            await User.update(
              { profilepicture: uniqueFileName },
              { where: { id: 1 } }
            );
            return User.findByPk(1);
          }
          
            
        catch (error) {
            console.error('Error uploading profile picture:', error);
            throw new Error('Failed to upload profile picture');
          }
        }*/
        // Validate file mimetype and size here
        // Save the uploaded file using multer
        // Save the uploaded file using multer
        // Validate file mimetype and size here
        // Validate file mimetype and size here
        // Validate file mimetype and size here
        //   await pipeline(createReadStream(), fs.createWriteStream(filePath));
        // Save the uploaded file using multer
        // Create an instance of Multer with the storage configuration
        // await pipelineAsync(createReadStream(), fs.createWriteStream(filePath));
        // Update the profile picture field in the users table
        // Return the updated user object
        /*uploadProfilePicture: async (_: any, { file }: { file: { createReadStream: () => ReadStream, filename: string, mimetype: string, encoding: string } }) => {
         try {
           const { createReadStream, filename, mimetype, encoding } = await file;
           const uniqueFileName = `${Date.now()}-${filename}`;
           const path = `./uploads/${uniqueFileName}`;
       
           await new Promise((resolve, reject) => {
             createReadStream()
               .pipe(fs.createWriteStream(path))
               .on('finish', resolve)
               .on('error', (error:any) => {
                 fs.unlinkSync(path); // Delete the file if an error occurs
                 reject(error);
               });
           });
       
           // Update the profile picture field in the users table
           await User.update(
             { profilepicture: uniqueFileName },
             { where: { id: 1 } }
           );
       
           // Return the updated user object
           return User.findByPk(1);
         } catch (error) {
           console.error('Error uploading profile picture:', error);
           throw new Error('Failed to upload profile picture');
         }
       }*/
        /*uploadProfilePicture: async (_: any, { file }: { file: { createReadStream: () => ReadStream, filename: string, mimetype: string, encoding: string } }) => {
          const { createReadStream, filename, mimetype, encoding } = file;
          const stream = createReadStream();
          const path = `uploads/${filename}`;
        
          await new Promise((resolve, reject) =>
            stream
              .pipe(createWriteStream(path))
              .on('finish', resolve)
              .on('error', (error: any) => {
                console.error(error);
                reject(error);
              })
          );
        
          return { filename, mimetype, encoding };
        }, */
    },
};
exports.default = userResolver;
