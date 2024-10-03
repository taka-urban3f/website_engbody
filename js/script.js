const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});


const elem_faqCtn = document.querySelector('.p-secFAQ__list__ctn');
if (elem_faqCtn) {
  elem_faqCtn.addEventListener('click', async function () {
    const elem_answer = elem_faqCtn.querySelector('.p-secFAQ__list__ctn__answer');
    if (elem_answer) {

      // console.log(elem_answer.clientHeight);
      // elem_answer.style.height = elem_answer.clientHeight + 'px';

      const keyframe = [{
          height: elem_answer.clientHeight + 'px'
        },
        {
          height: '0'
        },
      ];

      const timing = {
        duration: 300,
        fill: "forwards",
      };

      const obj_anim = elem_answer.animate(keyframe, timing);

      await obj_anim.finished;

      obj_anim.commitStyles();

    }


    // elem_faqCtn.classList.toggle('p-secFAQ__list__ctn--close');

  });
}