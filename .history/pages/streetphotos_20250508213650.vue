<template>
  <div class="street-photo-page">
    <!-- Hero Section -->
    <div class="hero-banner">
      <img src="~/assets/Sekiro_24.jpg" alt="Eolo Perfido" class="hero-image" />
      <div class="hero-overlay"></div>
      <div class="hero-text">
        <h1>Eolo Perfido</h1>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-area">
      <h2 class="content-title">About Eolo</h2>
      <div class="bio-section">
        <h3 class="bio-subtitle">BIO</h3>
        <p>
          Eolo Perfido (b. 1972, Cognac, France) is an acclaimed portrait photographer whose versatile studio specializes in advertising, editorial, and fine art photography. His illustrious career has seen collaborations with world-renowned communication agencies, including Leo Burnett, United 1861, Gray, Saatchi & Saatchi, JWT, DDB, and BBDO.
          You can replace this text with more details about Eolo Perfido or any other content you wish to display here. This section is designed to provide biographical information or a description related to the main subject of the page.
        </p>
        <!-- You can add more paragraphs or content here -->
      </div>
    </div>
  </div>
</template>

<script setup>
// You can add any specific script logic for this page here
// For example, fetching data, methods, etc.
</script>

<style scoped>
.street-photo-page {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* Hero Section Styles */
.hero-banner {
  position: relative;
  width: 100%;
  height: 60vh; /* Adjust height as needed, e.g., 400px, 50vh */
  overflow: hidden;
  background-color: #222; /* Fallback color if image doesn't load */
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Cover the area, might crop */
  object-position: center; /* Center the image */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* Dark overlay for better text readability */
}

.hero-text {
  position: absolute;
  bottom: 40px; /* Position from bottom */
  right: 40px; /* Position from right */
  color: white;
  text-align: right;
}

.hero-text h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem); /* Responsive font size */
  font-weight: bold;
  margin: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
}

/* Content Section Styles */
.content-area {
  max-width: 900px; /* Max width of the content */
  margin: 40px auto; /* Center the content with top/bottom margin */
  padding: 0 20px; /* Padding on the sides */
}

.content-title {
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 25px;
  color: #2c3e50;
}

.bio-section {
  margin-top: 15px;
}

.bio-subtitle {
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #555;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.bio-section p {
  font-size: 1rem;
  color: #4a4a4a;
  margin-bottom: 15px;
  text-align: justify;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-banner {
    height: 50vh;
  }

  .hero-text {
    bottom: 20px;
    left: 20px; /* Adjust for smaller screens, maybe centered or left-aligned */
    right: auto;
    text-align: left;
  }

  .hero-text h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
  }

  .content-area {
    margin: 30px auto;
  }

  .content-title {
    font-size: 1.8rem;
  }
}
</style>