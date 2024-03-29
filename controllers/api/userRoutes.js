const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
    try {
      const userData = await User.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            attributes: ["id", "title", "description", "date_created"],
          },
          {
            model: Comment,
            attributes: ["id", "comment_body", "post_id", "user_id", "created_at"],
            include: {
              model: Post,
              attributes: ["title"],
            },
          },
          {
            model: Post,
            attributes: ["title"],
          },
        ],
      });
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
// CREATE new user/sign up
router.post("/", async (req, res) => {
  try {
    // const { name, email, password } = req.body;
    const userData = await User.create({ 
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.logged_In = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.name = dbUserData.name;
      req.session.logged_In = true;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_In) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
