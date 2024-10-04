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

// Priceセクションを横スクロールしたらガイドを消す処理。
const elem_srcollBox = document.querySelector('.p-secPrice__scrollBox');
const elem_guide = document.querySelector('.p-secPrice__scrollBox__guide')
if (elem_srcollBox && elem_guide) {
  elem_srcollBox.addEventListener('scroll', function () {
    elem_guide.classList.add('p-secPrice__scrollBox__guide--hide');
  });
}

// FAQのドロワー開閉処理
const elems_faqCtn = document.querySelectorAll('.p-secFAQ__list__ctn');
if (elems_faqCtn.length >= 1) {
  elems_faqCtn.forEach(function (elem_faqCtn) {
    // ページロード時にそれぞれのAnswerドロワーを閉じておく。
    const elem_answer = elem_faqCtn.querySelector('.p-secFAQ__list__ctn__answer');
    if (elem_answer) {
      elem_answer.style.height = '0px'
    }

    elem_faqCtn.addEventListener('click', async function () {
      // ドロワーの矢印の向きを変える。
      const elem_arrow = this.querySelector('.p-secFAQ__list__ctn__arrow');
      if (elem_arrow) {
        elem_arrow.classList.toggle('p-secFAQ__list__ctn__arrow--reverse');
      }

      const elem_parent = elem_faqCtn.querySelector('.p-secFAQ__list__ctn__answer');
      const elem_child = elem_faqCtn.querySelector('.p-secFAQ__list__ctn__answerInner');
      if (elem_parent && elem_child) {
        // ドロワーオープン時に必要な高さは、子要素の高さ。
        const style_child = window.getComputedStyle(elem_child);
        let keyframe;
        // クリック時にドロワーの高さがゼロであれば開き、それ以外では閉じる。
        if (window.getComputedStyle(elem_parent).height === '0px') {
          keyframe = [{
            height: '0'
          }, {
            height: style_child.height
          }, ];
        } else {
          keyframe = [{
              height: style_child.height
            },
            {
              height: '0'
            },
          ];
        }

        const timing = {
          duration: 300,
          easing: "ease-out",
          fill: "forwards",
        };

        const obj_anim = elem_parent.animate(keyframe, timing);

        //アニメーションが終了するまで待つ。
        await obj_anim.finished;

        // 属性値を固定させる。
        obj_anim.commitStyles();

        // 明示的にアニメーションを削除。
        obj_anim.cancel();
      }
    });
  });
}