
function Menu(container) {
    var root = container;
    var links = root.querySelectorAll('[aria-haspopup="true"]');
    var ENTER_KEY_CODE = 13;
    var TAB_KEY_CODE = 9;

    [].forEach.call(links, function(link) {
        var timer;

        link.parentElement.addEventListener('mouseenter', function(event) {
            openItem(link);
            clearInterval(timer);
        });

        link.parentElement.addEventListener('mouseleave', function(event) {
            timer = setTimeout(function() {
                closeItem(link);
            }, 300);
        });

        link.addEventListener('touchend', function(event) {
            toggleItem(link);
        });

        link.addEventListener('keydown', function(event) {
            if (event.keyCode !== ENTER_KEY_CODE) return;
            toggleItem(link);
        });

        const menu = getMenuForItem(link);

        menu.addEventListener('transitionend', function(event) {
            if (event.propertyName !== 'opacity') return;

            if (link.getAttribute('aria-expanded') === 'false') {
                menu.style.display = 'none';
            }            
        })
    });

    document.addEventListener('click', function(event) {
        closeNotTargetedItems(event.target);
    });

    document.addEventListener('keyup', function(event) {
        if (event.keyCode !== TAB_KEY_CODE) return;
        closeNotTargetedItems(event.target);
    });

    function closeNotTargetedItems(target) {
        [].forEach.call(links, function(link) {
            if (!link.parentElement.contains(target)) {
                closeItem(link);
            }
        })
    }

    function getMenuForItem(link) {
        return link.nextElementSibling;
    }

    function toggleItem(itemLink) {
        if (itemLink.getAttribute('aria-expanded') === 'false') {
            openItem(itemLink);
        } else {
            closeItem(itemLink);
        }
    }

    function openItem(itemLink) {
        itemLink.setAttribute('aria-expanded', 'true');
        const menu = getMenuForItem(itemLink);
        menu.style.display = '';

        setTimeout(function(){
            menu.removeAttribute('aria-hidden');
        }, 0);       
    }

    function closeItem(itemLink) {
        itemLink.setAttribute('aria-expanded', 'false');
        getMenuForItem(itemLink).setAttribute('aria-hidden', 'true');
    }
    
}

new Menu(document.querySelector('[data-role="menu"]'));
