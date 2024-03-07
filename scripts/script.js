let footer = null;
window.addEventListener("DOMContentLoaded", async function() {
    footer = document.querySelector("footer");
    const scroll_to_bottom_btn = document.querySelector(".scroll-to-bottom-button");
    const observer = new IntersectionObserver(function(e) {
        scroll_to_bottom_btn.style.display = (e[0].isIntersecting) ? "none" : "grid"; 
    });
    observer.observe(footer);


    insert_cookie_button();
    await load_lacb();

    const cookies = lacb.get_cookies();
    if(cookies['statistics']) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-KQQQNV87RK');
    }

});

function scroll_to_bottom() {
    if(footer !== null) footer.scrollIntoView({"behavior": "smooth"});
}

function toggle_sidebar(e) {
    const sidebar = document.querySelector(".sidebar");
    const now = sidebar.classList.toggle("active");
    e.innerText = (now) ? "keyboard_double_arrow_left" : "keyboard_double_arrow_right";
}


function load_lacb() {
    const LACB_URL = "https://raw.githubusercontent.com/lorenzoarlo/website-utilities/main/lacb.js"
    return new Promise(function(resolve) {
        fetch(LACB_URL).then(function(doc) {
            return doc.text();
        }).then(function(testo) {
            const scriptNode = document.createElement("script");
            scriptNode.textContent = testo;
            document.body.appendChild(scriptNode);

            resolve(true);
        }).catch(function(error) {
            resolve(false);
        });
    });   
}

function insert_cookie_button() {
    const onAcceptScriptPath  = "https://raw.githubusercontent.com/lorenzoarlo/website-utilities/main/accept.js";
    const onDeclineScriptPath = "https://raw.githubusercontent.com/lorenzoarlo/website-utilities/main/decline.js";
    const onFindMorePagePath = "https://lorenzoarlo.github.io/privacy-and-cookies/";
    
    
    const lacb = document.createElement("lorenzoarlo-cookiebutton");
    lacb.setAttribute("on-accept-script-path", onAcceptScriptPath);
    lacb.setAttribute("on-decline-script-path", onDeclineScriptPath);
    lacb.setAttribute("on-find-more-page-path", onFindMorePagePath);

    document.body.appendChild(lacb);
}