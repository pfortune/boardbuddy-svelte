# Board Buddy

## Connecting board game enthusiasts with local gaming venues.

Board Buddy is a web application designed to simplify the discovery and management of venues that offer board gaming experiences. It serves as a bridge between gamers seeking new places to enjoy their hobby and venues looking to attract the gaming community.

[Board Buddy Website](http://www.boardbuddy.ie)

## Users

### Example Accounts

**Admin**  
Username: homer@simpson.com  
Password: secret

**User**  
Username: marge@simpson.com  
Password: secret

### Key Features

- **Discover Game-Friendly Locations:** Explore a selection of local cafes, pubs, and other venues with board games, visualized on interactive maps powered by Leaflet, including real-time weather updates for each location.
- **Venue and Game Management:** After signing up, users can add new locations, complete with games available at each venue and associated images.
- **Board Game Geek Integration:** Simplify adding games by searching the Board Game Geek API, which automatically populates game details.
- **Toast Notifications:** Helpful notifications alert users when new locations or games have been added or deleted.
- **Theme Switching:** Customize the app's appearance with theme switching capabilities, offering 11 built-in themes each with dark and light modes.
- **Responsive Design:** Enjoy a seamless, user-friendly experience across all devices, ensuring access to Board Buddy's features anytime, anywhere.
- **Secure Account Management:** Robust authentication using Clerk ensures that signing up, logging in, and managing user accounts are secure, protecting user data and privacy.
- **Admin Oversight:** Admins maintain the integrity of the platform, with capabilities including user management, location updates, and image deletions.
- **Reports and Statistics:** View interesting stats, charts, and trends about the locations and board games at various venues, built with Chart.js.
- **Ratings:** Users can rate locations out of 5.
- **Image Gallery:** View images in a carousel for each location, and access an aggregated gallery of all images from every location.

## Technology Stack

- **Frontend:** SvelteKit, Skeleton UI, Tailwind CSS
- **Backend:** Node.js
- **Database:** MongoDB Cloud Atlas
- **Maps:** Leaflet
- **Authentication:** Clerk
- **Storage:** Cloudinary
- **Charts:** Chart.js
- **Deployment:** Vercel

## Getting Started

**Prerequisites:**

- Node.js and npm installed

## Installation

1. Clone the repository: `git clone https://github.com/pfortune/BoardBuddy.git`
2. Navigate to the project directory: `cd BoardBuddy`
3. Install dependencies: `npm install`
4. Create a `.env` file by copying the `.env.example` file and filling in the required values:
   ```sh
   cp .env.example .env
   ```
5. Fill in the environment variables in the `.env` file:
   ```plaintext
   VITE_CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_SECRET=your_cloudinary_secret
   MONGO_URL=your_mongo_url
   NODE_ENV=your_node_env
   PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   ```

**Development:**

1. Start the development server: `npm run dev`


## Contributing

Contributions are welcome! Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For support or inquiries, please contact us at [support@boardbuddy.ie](mailto:support@boardbuddy.ie).
