# Rest API Authentication of users with Typescript and Passport
## Description

This repository is a Application software with Typescript,NodeJS, Express, JWT, PassportJS, MongoDB,etc this application contains an API created with TYPESCRIPT.

## Installation
Using Typescript, Express, Mongoose, Bcrypt, Passport, etc preferably.

## DataBase
Using MongoDB preferably.

## Apps
Using Postman, Insomnia, Talend API Tester, etc to feed the api.

## Usage
```html
$ git clone https://github.com/Rest-API-Auth-JWT-NodeJS-Typescript-Passport-MongoDB.git [NAME APP] 

$ npm install

$ npm run dev
```
Follow the following steps and you're good to go! Important:


![alt text](https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2020/04/missingReturnValue-3-9.gif)


## Coding

### Config

```typescript
...
export default {
  port: process.env.PORT || 3000,
  DB: {
    URI:
      process.env.MONGO_URI ||
      "mongodb://127.0.0.1:27017/restapijwttspassport_db",
    USER: process.env.MONGO_USER,
    PASSWORD: process.env.MONGO_PASSWORD,
  },
  secretKey:
    process.env.SECRET_KEY || "T_LHqi1hEFpsxPZ2heE.wkUKn3k3QSw.DdEK4EQ",
};
...
```

### Routes

```typescript
...

const router = Router();

router.post("/signin", signIn);
router.post("signup", signUp);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Success!!");
  }
);

...
```

### Middlewares

```typescript
...
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secretKey,
};

export default new Strategy(opts, (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.log(error);
  }
});
...
```

### Controllers


```typescript
...
 export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password." });
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ msg: "User already exixts!" });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ msg: "Please, send your email and password." });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ msg: "User does not exixts!" });
  }

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (isMatch) {
    return res.status(201).json({ token: createToken(user) });
  }

  return res.status(400).json({ msg: "The email or password are incorrect!" });
};
...

```

### Model

```typescript
...
const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      minlength: 4,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    avatar: {
      type: String,
      maxlength: 512,
      required: false,
    },
    role: {
      type: String,
      enum: ["SUPERADMIN", "ADMIN", "USER"],
      default: "USER",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

export default model<IUser>("User", UserSchema);
...
```



## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/DanielArturoAlejoAlvarez/Rest-API-Auth-JWT-NodeJS-Typescript-Passport-MongoDB. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).