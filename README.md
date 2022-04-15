# Fanime
Description
This is a website in which the user can retrieve all the informations about an anime. He can add Anime to his favourites list, remove them, leave a comment below the anime detail page.

User Stories

    • 404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
    • Signup: I need to sign up and the login to use the platform
    • Login: As a user I can login to the platform so that I can start looking through all the Animes I'd like to retrieve informations about
    • Logout: As a user I can logout from the platform so no one else can modify my information
    • Add Animes to favourite: As a user I can add Animes to my Favourites Anime List
    • Delete elements As a user I can delete Animes from my Favourites Anime List
    • Add comment As a user I can leave a comment below every Anime Details Page
    • Search Anime As a user I can search for an Anime I'd like to get informations about by typing the name in the searchbar
    • Check profile As a user I can check my profile 

Client / Frontend
React Router Routes (React App)
 <Routes>
    •         <Route element={<LayoutComponent />}> //Navbar.
    •           <Route path="/" element={<Login />} /> //Show Signup and Login Form.
    •           <Route path="/home"> //After Login Shows all the categories of Anime.
    •             <Route index element={<Home />} />
    •             <Route path=":id" element={<DetailAnimePage />} /> //When an Anime in Home is clicked, renders a page with all the Anime Dtails
    •             <Route
    •               path="SearchResult"
    • element={<SearchResultPage searchResult={searchResult} />} //In the search bar you can search an anime you would like to retrieve informations about. It renders the Search Result Page, in which you can see all the Anime of your query.
    •             />
    •           </Route>
    •           <Route path="/login" element={<Login />} />
    •           <Route path="/signup" element={<SignUp />} />
    •           <Route path="/profile" element={<Profile />} /> // Shows the Users Profile.
    •           <Route path="/showfavoriteAnimes" element={<Favorites />} /> // Shows the Anime that the User added to his favourites.
    • <Route path="*" element={<Custom404Page />} />
    •         </Route>
      </Routes>

Components

    • Button Favorite
    • Comment
    • Custom404Page
    • DetailAnimePage
    • Favorites
    • Home
    • LayoutComponent
    • Login
    • Profile
    • Search
    • SearchResultPage
    • Signup
    • UserNameAndPasswordForm

Context

    • AuthProviderWrapper
    • ListAnimeDetail



Services
Auth Service

    • auth.login(user)
    • auth.signup(user)
    • auth.logout()


External API

    • API for Animes


Server / Backend

    • Models

User model

{
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteAnimes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Anime",
      },
    ],
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

Anime model

 {
    canonicalTitle:String,
    synopsis: String,
    averageRating: String,
    favoritesCount: Number,
    startDate: String,
    endDate: String,
    coverImage: String,
    episodeCount: Number,
    episodeLength: Number,
    youtubeVideoId: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    
  },
  
  {
    
    timestamps: true,
  }
);

Comment model

{ name:{
    type:String,
    
},
animeName:{type: String},
    comment: {
      type: String,
      
      },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  anime: {
    type: Schema.Types.ObjectId,
    ref: "Anime",
  },
},
{
  timestamps: true,
  }
);


API Endpoints (backend routes)
Anime Routes

    • router.get("/home")
    • router.post("/saveFavoriteAnime")
    • router.get("/showfavoriteAnimes")
    • router.post("/createComment")
    • router.get("/getComments/:animeName")
    • router.get("/search/:anime")
    • router.delete("/deleteAnime/:id")

Auth Routes

    • router.post("/login")
    • router.post("/signup")
    • router.post("/logout")
    • router.get("/verify")

Cloudinary Routes

    • router.post("/upload")


Git

    • https://github.com/AdryanPro/Fanime
    • https://spontaneous-pithivier-61cc3a.netlify.app/

Slides

    • https://docs.google.com/presentation/d/1Pzrw5bNWc-Pu2NZYd14hU1a49sPBnxMrVLyHjJxvQig/edit?usp=sharing
