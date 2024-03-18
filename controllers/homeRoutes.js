const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Get all existing Posts including user and comment

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: [
        'id',
        'description',
        'title',
        'date_created',
      ],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'date_created'],
          include: {
            model: User,
            attributes: ["name"],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      // Pass the logged in flag to the template
      logged_In: req.session.logged_In,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route to get a single post including the user and comment
// Prevent non logged in users from viewing the post
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      attributes: [ "id", "description", "title", "date_created"],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_body", "post_id", "user_id", "date_created"],
          include:{
            model: User,
            attributes: ["name"],
          },
          
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });
    console.log(post);

    res.render("post", {
      ...post,
      logged_In: req.session.logged_In,
    });
  } catch (err) {
    res.status(500).json(err);
    res.redirect("/");
  }
});

// Route to allow logged in user access to the dashboard page to view post and comment of the user
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },

      include: [
        {
          model: Post,
          include: [User],
        },
        {
          model: Comment,
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user);

    res.render("dashboard", {
      ...user,
      logged_In: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders 'create.handlebars'; redirects to /login if not logged in
router.get("/create", async (req, res) => {
  try {
    if (req.session.logged_In) {
      res.render("create", {
        logged_In: req.session.logged_In,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// 
router.get("/create/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const post = postData.get({ plain: true });
    console.log(post);

    if (req.session.logged_In) {
      res.render("edit", {
        ...post,
        logged_In: req.session.logged_In,
        userId: req.session.user_id,
      });
      return;
    } else {
      res.redirect("/login");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_In) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_In) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// Export
module.exports = router;
