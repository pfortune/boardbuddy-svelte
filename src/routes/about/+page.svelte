<script lang="ts">
  import { Card } from "$lib/ui";

  import { Accordion, AccordionItem, filter } from "@skeletonlabs/skeleton";
  import image from "./faq.svg";
  const faqData = [
    {
      question: "How can I reset my password?",
      answer: "If you need to reset your password, click 'Forgot Password' on the login page and follow the instructions to receive a reset link via email."
    },
    {
      question: "How can I find game-friendly locations near me?",
      answer: "Use the interactive map powered by Leaflet on our homepage to explore local cafes, pubs, and other venues that offer board games."
    },
    {
      question: "Can I add new gaming venues?",
      answer: "Yes, after signing up, you can add new locations and specify the games available at each venue through the 'Add Location' feature."
    },
    {
      question: "How do I upload images to a location's gallery?",
      answer: "To upload images, go to the venue's page and click on 'Upload Images.' You can upload multiple images."
    },
    {
      question: "How can I switch themes?",
      answer: "To switch themes, navigate to the menu and select your preferred theme. The app supports multiple themes for a customised experience."
    },
    {
      question: "What technologies are used to build Board Buddy?",
      answer:
        "Board Buddy is built using a modern technology stack to ensure a seamless and secure user experience. The frontend and backend are developed with SvelteKit, and styled with Tailwind CSS. The database is managed using MongoDB Cloud Atlas. Interactive maps are implemented using Leaflet, user authentication is handled by Clerk, and Cloudinary is used for image storage. The application is typically deployed on Vercel."
    }
  ];
</script>

<div class="p-4">
  <ol class="breadcrumb">
    <li class="crumb"><a class="anchor" href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden="true">&rsaquo;</li>
    <li class="crumb">About</li>
  </ol>
</div>

<Card title="About">
  <div class="space-y-4">
    <h2 class="text-lg font-bold">Bringing Board Game Enthusiasts Together</h2>
    <p>
      Board Buddy is a community-driven platform designed to connect board game lovers with local venues and events. Whether you're a casual player or a dedicated enthusiast, Board
      Buddy makes it easy to find the perfect spot for your next game night.
    </p>

    <h2 class="text-lg font-bold">Features & Benefits</h2>
    <ul class="list-disc pl-5 space-y-2">
      <li>Discover new board game cafes, libraries, and community centers near you.</li>
      <li>Connect with fellow gamers and make new friends.</li>
      <li>Explore an ever-growing library of board games.</li>
      <li>Share and receive recommendations on games and gaming spots.</li>
    </ul>
  </div>
</Card>

<Card title="FAQ">
  <div class="grid items-center grid-cols-1 md:grid-cols-2 md:gap-4">
    <img class="hidden md:block" src={image} alt="FAQ" use:filter={"#BlueNight"} />
    <div class="">
      <div class="mb-4 text-2xl font-bold">Frequently Asked Questions</div>
      <Accordion spacing="space-y-1" hover="" regionControl="p-4" regionPanel="bg-surface-100-800-token text-sm !rounded-t-none">
        {#each faqData as item, i}
          <AccordionItem class="bg-surface-50-900-token rounded-container-token border border-surface-200-700-token" open={i == 0}>
            <svelte:fragment slot="summary">{item.question}</svelte:fragment>
            <svelte:fragment slot="content">{item.answer}</svelte:fragment>
          </AccordionItem>
        {/each}
      </Accordion>
    </div>
  </div>
</Card>
