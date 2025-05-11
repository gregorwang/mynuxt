<template>
  <div class="testimonials-page">
    <div class="testimonials-container">
      <h2 class="main-title">What People Are Saying</h2>

      <div class="testimonial-item">
        <div class="testimonial-text-content">
          <p class="quote">
            "Photographing and working with Steve McCurry and Eolo Perfido was a <strong>dream come true</strong>. Looking back on the past few days and reflecting upon the sheer amount of time spent learning photography has made me realize how even more special this workshop was, be it the amazingly friendly participants or the incredibly knowledgeable teachers, Eolo and Steve. The street and studio days had a very hands-on approach and were really helpful. It has been an absolute privilege to meet and learn from them. I will cherish this for a lifetime!"
          </p>
          <p class="author">- Aryan P, India</p>
        </div>
        <div class="testimonial-image-content">
          <img src="~/assets/IMG_20250331_151156.jpg" alt="Testimonial 1 Image" class="testimonial-image" />
        </div>
      </div>

      <div class="testimonial-item testimonial-item-alt">
        <!-- For alternating layout, image can be on the left -->
        <!-- <div class="testimonial-image-content">
          <img src="~/assets/IMG_20250401_150050.jpg" alt="Testimonial 2 Image" class="testimonial-image" />
        </div> -->
        <div class="testimonial-text-content">
          <p class="quote">
            "The Rome Street photography and portrait workshop with Steve and Eolo was the most incredible learning experience I have had! A wonderful combination of street and studio, natural light and artificial light, street scenes and models made it so interesting with both Steve and Eolo very involved and hands on with us all day. Remarkably well curated! We observed, we learnt and we asked a lot of questions! Above all it was fun! <strong>I would do a workshop with them again in a heartbeat.</strong>"
          </p>
          <p class="author">- Dimple A, London</p>
        </div>
         <div class="testimonial-image-content"> <!-- Image on the right as per reference -->
          <img src="~/assets/IMG_20250401_150050.jpg" alt="Testimonial 2 Image" class="testimonial-image" />
        </div>
      </div>

      <div class="testimonial-item">
        <div class="testimonial-text-content">
          <p class="quote">
            "The workshop exceeded my expectations in every aspect (and they were crazy high!). Both Steve and Eolo were exemplary in their own distinct way of sharing their passion with us participants. They were really didactical, available, kind and very generous in their advice and feedback. And even the opportunity of simply watching two incredible photographers at work was already very inspiring. The balance between theory/studio sessions and shootings in the streets was perfect and we were able to touch various work environments and photography styles in the course of a week."
          </p>
          <p class="author">- Another Person, City</p>
        </div>
        <div class="testimonial-image-content">
          <img src="~/assets/IMG_20250401_150311.jpg" alt="Testimonial 3 Image" class="testimonial-image" />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// No specific script logic needed for this static page yet
</script>

<style scoped>
.testimonials-page {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: #333;
  background-color: #fff; /* Assuming a white background from the image */
  padding: 40px 20px;
}

.testimonials-container {
  max-width: 1100px;
  margin: 0 auto;
}

.main-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 50px;
  text-align: left; /* Title aligned to the left as in image */
}

.testimonial-item {
  display: flex;
  flex-wrap: wrap; /* Allow wrapping on smaller screens */
  align-items: flex-start; /* Align items to the top */
  margin-bottom: 60px; /* Space between testimonial blocks */
  gap: 30px; /* Gap between text and image columns */
}

/* Alternating layout can be achieved by changing flex-direction or order */
/* .testimonial-item-alt {
  flex-direction: row-reverse; /* Uncomment if you want image on left for this item */
/* } */

.testimonial-text-content {
  flex: 1; /* Takes up available space */
  min-width: 300px; /* Minimum width before wrapping */
  padding-right: 20px; /* Space between text and image if image is on right */
}

/* If image is on the left for testimonial-item-alt */
/* .testimonial-item-alt .testimonial-text-content {
  padding-right: 0;
  padding-left: 20px;
} */

.testimonial-image-content {
  flex: 1; /* Takes up available space */
  min-width: 300px; /* Minimum width for image container */
  max-width: 450px; /* Max width for image container to control image size */
}

.testimonial-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px; /* Slight rounding if desired */
  /* box-shadow: 0 4px 8px rgba(0,0,0,0.1); /* Optional shadow */
}

.quote {
  font-size: 1rem;
  line-height: 1.7;
  color: #4a4a4a;
  margin-bottom: 20px;
  font-style: italic; /* Italicize the quote */
}

.quote strong {
  font-style: normal; /* Keep bold text normal style */
}

.author {
  font-size: 0.95rem;
  font-weight: bold;
  color: #333;
  text-align: left; /* Author aligned to the left */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
    margin-bottom: 30px;
    text-align: center; /* Center title on smaller screens */
  }

  .testimonial-item,
  .testimonial-item-alt {
    flex-direction: column; /* Stack text and image vertically */
    align-items: center; /* Center items when stacked */
    gap: 20px;
  }

  .testimonial-text-content {
    padding-right: 0;
    padding-left: 0; /* Remove padding when stacked */
    text-align: center; /* Center text content */
  }
   .testimonial-item-alt .testimonial-text-content {
    padding-left: 0;
  }

  .author {
    text-align: center; /* Center author text */
  }

  .testimonial-image-content {
    max-width: 100%; /* Allow image to take full width of its container */
    margin-top: 10px; /* Add some space above image when stacked */
  }
}
</style>