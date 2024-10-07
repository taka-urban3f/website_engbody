// jsが有効であることを表す。
document.body.classList.remove('noscript');

// ---------------------------------------------------
// -----スワイパーの設定-----
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

// ---------------------------------------------------
// -----Priceセクションを横スクロールしたらガイドを消す処理-----
const elem_srcollBox = document.querySelector('.p-secPrice__scrollBox');
const elem_guide = document.querySelector('.p-secPrice__scrollBox__guide')
if (elem_srcollBox && elem_guide) {
  elem_srcollBox.addEventListener('scroll', function () {
    elem_guide.classList.add('p-secPrice__scrollBox__guide--hide');
  });
}

// ---------------------------------------------------
// -----FAQのドロワー開閉処理-----
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

// ---------------------------------------------------
// -----スクロースイベントに関する処理-----
window.addEventListener('scroll', function () {
  const elem_header = document.querySelector('.l-header');
  if (elem_header) {
    if (window.scrollY != 0) {
      elem_header.classList.add('l-header--stickout');
    } else {
      elem_header.classList.remove('l-header--stickout');
    }
  }

  const elem_return = document.querySelector('.c-returnToTop');
  if (elem_return) {
    if (window.scrollY != 0) {
      elem_return.classList.add('c-returnToTop--show');
    } else {
      elem_return.classList.remove('c-returnToTop--show');
    }
  }
});

// ---------------------------------------------------
// -----MVの画像をフェードインさせる処理-----
window.addEventListener('load', function () {
  const elem_mv = document.querySelector('.p-secMV__img');
  if (elem_mv) {
    elem_mv.style.transition = "opacity 0.7s ease-in";
    elem_mv.style.visibility = "visible";
    elem_mv.style.opacity = 1;
  }
});


// ---------------------------------------------------
// -----スクロールしたら画面内でフェードインさせる処理-----
function doWhenIntersection(entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.style.visibility = 'visible';
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}

const io_options = {
  root: null,
  rootMargin: "-100px 0px",
  threshold: 0,
};

const io = new IntersectionObserver(doWhenIntersection, io_options);

// フェードインさせるそれぞれの要素に初期状態とアニメーションを設定する。
const elems_catchBox = document.querySelectorAll('.p-secCatch__ctn__box, .p-secTrainer__box');
if (elems_catchBox.length >= 1) {
  elems_catchBox.forEach(function (elem_box) {
    elem_box.style.visibility = 'hidden';
    elem_box.style.opacity = 0;
    elem_box.style.transform = 'translateY(50px)';
    elem_box.style.transition = "opacity 0.7s ease-in, transform 1s ease-out";

    io.observe(elem_box);
  });
}