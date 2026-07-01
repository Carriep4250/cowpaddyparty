@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
    --card: 0 0% 7%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 7%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 84% 50%;
    --primary-foreground: 0 0% 100%;
    --secondary: 0 0% 12%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 15%;
    --muted-foreground: 0 0% 60%;
    --accent: 45 93% 47%;
    --accent-foreground: 0 0% 0%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 18%;
    --input: 0 0% 18%;
    --ring: 45 93% 47%;
    --radius: 0.625rem;
    --sidebar-background: 0 0% 5%;
    --sidebar-foreground: 0 0% 90%;
    --sidebar-primary: 45 93% 47%;
    --sidebar-primary-foreground: 0 0% 0%;
    --sidebar-accent: 0 0% 12%;
    --sidebar-accent-foreground: 0 0% 98%;
    --sidebar-border: 0 0% 15%;
    --sidebar-ring: 45 93% 47%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
