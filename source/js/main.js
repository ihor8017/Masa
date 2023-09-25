import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  iosVhFix();
  const menu = () => {
    const navigation = document.querySelector('.header__navigation');
    if (navigation) {
      const button = document.querySelector('.navigation__button');
      const menuList = document.querySelector('.navigation__list');
      let height = menuList.scrollHeight;
      console.log(height);
      let overlay = document.querySelector('.overlay');
      function closeMenu() {
        navigation.classList.remove('navigation--open');
        navigation.classList.add('navigation--close');
        menuList.style.minHeight = '0';
        menuList.style.width = '0';
        menuList.style.padding = '0';
        overlay.style.background = 'none';
        document.body.style.overflow = 'visible';
        document.body.style.overflowX = 'hidden';
      }
      function openMenu() {
        navigation.classList.add('navigation--open');
        navigation.classList.remove('navigation--close');
        overlay.style.background = 'rgba(0, 0, 0, 0.5)';
        menuList.style.minHeight = 'min-content';
        menuList.style.width = '100%';
        menuList.style.padding = '33px 25px';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
      }
      function onExternClick(evt) {
        if (!evt.target.closest('.header__navigation')) {
          document.removeEventListener('click', onExternClick, true);
          closeMenu();
        }
      }

      const toggleNavigation = () => {
        navigation.classList.remove('no-js');
        button.addEventListener('click', (evt) => {
          evt.preventDefault();
          if (navigation.classList.contains('navigation--open')) {
            closeMenu();
          } else {
            document.addEventListener('click', onExternClick);
            openMenu();
          }
        });
        const navigationList = document.querySelector('.navigation__list');
        navigationList.addEventListener('click', (evt) => {
          const target = evt.target;
          if (target.closest('.navigation__link')) {
            closeMenu();
          }
        });
      };
      toggleNavigation();
    } else {
      return;
    }
  };
  menu();
  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
