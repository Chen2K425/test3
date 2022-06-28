import Ajax from '../lib/Ajax.js';

export default {
    // テンプレート //================//
    template: `<div class="Top">
    <img src="./assets/img/application_icon.png" alt="home" width="150px" height="150px" class="toppage-icon">
    <div class="top-color">
    
    <br>
    <br>
    <div class="top-fadein">
            <router-link :to="'/AccReg'"><div class="un">
                <span>login</span><br>
            </div></router-link>
        <span>or</span>
        <br>
            <router-link :to="'/Register'"><div class="un">
                <span>register</span>
            </div></router-link>
        </div>
    </div>
        </div>`,
    };