class Theme {

    theme = localStorage.getItem('theme') || 'auto';
    themeSwitcher = document.getElementById('theme-switcher');
    themeSwitcherIcon = this.themeSwitcher.querySelector('i');
    castlesIcons = document.querySelectorAll('.castle-icon');

    constructor() {
        this.addListeners();
    }

    addListeners() {
        this.themeSwitcher.addEventListener('click', () => {
            this.toggleTheme();
        });

        window.addEventListener('load', () => {
            this.loadTheme();
        });
    }

    toggleTheme() {
        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme');

        if (currentTheme === 'light') {
            this.theme = 'dark';
        } else {
            this.theme = 'light';
        }

        this.setTheme();
    }

    loadTheme() {
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'dark') {
            this.theme = 'dark';
        } else {
            this.theme = 'light';
        }

        this.setTheme();
    }

    setTheme() {
        const htmlElement = document.documentElement;

        if (this.theme === 'dark') {
            htmlElement.setAttribute('data-theme', 'dark');
            this.themeSwitcherIcon.innerText = 'light_mode';
            localStorage.setItem('theme', 'dark');
            this.castlesIcons.forEach((castleIcon) => {
                castleIcon.setAttribute('style', 'filter: invert(1)');
            });
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            this.themeSwitcherIcon.innerText = 'dark_mode';
            localStorage.setItem('theme', 'light');
            this.castlesIcons.forEach((castleIcon) => {
                castleIcon.setAttribute('style', 'filter: invert(0)');
            });
        }
    }
}

export default Theme;