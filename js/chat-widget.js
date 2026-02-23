// Chat Widget de Soporte - AstroKey
class SupportChatWidget {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
    }

    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'support-chat-widget';
        widget.innerHTML = `
            <div class="chat-window" id="chatWindow">
                <div class="chat-header">
                    <h3>💬 Soporte AstroKey</h3>
                    <p>¿En qué podemos ayudarte?</p>
                </div>
                <div class="chat-content">
                    <ul class="faq-list">
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Cómo funciona la lectura astral?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p>Nuestra IA ha sido entrenada con más de 2.5 millones de cartas natales por 5,000+ astrólogos expertos. Introduce tus datos de nacimiento y obtienes una lectura personalizada con 94.7% de precisión en menos de 3 segundos.</p>
                            </div>
                        </li>
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Qué datos necesito?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p>Necesitas: fecha de nacimiento (día, mes, año), hora exacta de nacimiento (preferiblemente del certificado) y lugar de nacimiento (ciudad y país). Cuanto más precisa la hora, más exacta la lectura.</p>
                            </div>
                        </li>
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Mis datos están seguros?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p>Absolutamente. Usamos encriptación militar (AES-256), servidores seguros con múltiples capas de protección. Nunca compartimos información con terceros. Cumplimos GDPR y regulaciones internacionales.</p>
                            </div>
                        </li>
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Cómo solicito un reembolso?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p><strong>IMPORTANTE:</strong> Para procesar tu reembolso, debes enviar un email a soporte@astrokey.io incluyendo: <br>• Número de pedido <br>• Datos completos del cliente <br>• Correo electrónico registrado <br><br>Sin esta información, no se podrá efectuar el reembolso.</p>
                            </div>
                        </li>
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Cómo cancelo mi suscripción?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p>Puedes cancelar desde tu panel de usuario o contactando soporte. La cancelación es inmediata, pero mantienes acceso hasta que termine tu período actual. Sin penalizaciones.</p>
                            </div>
                        </li>
                        <li class="faq-item-chat">
                            <button class="faq-question-chat" onclick="toggleChatFaq(this)">
                                <span>¿Cuánto tarda el soporte?</span>
                                <i class="fas fa-chevron-down faq-chevron"></i>
                            </button>
                            <div class="faq-answer-chat">
                                <p>Nuestro equipo responde en menos de 12 horas. Para consultas urgentes sobre reembolsos o problemas técnicos, priorizamos las respuestas en menos de 6 horas.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="chat-footer">
                    <a href="mailto:soporte@astrokey.io?subject=Consulta%20AstroKey" class="chat-email-btn">
                        <i class="fas fa-envelope"></i>
                        Contactar Soporte
                    </a>
                </div>
            </div>
            <button class="chat-toggle" id="chatToggle">
                <div class="chat-icon-container">
                    <i class="fas fa-comment-dots"></i>
                    <div class="notification-dot"></div>
                </div>
            </button>
        `;

        document.body.appendChild(widget);
    }

    attachEventListeners() {
        const toggle = document.getElementById('chatToggle');
        const window = document.getElementById('chatWindow');

        toggle.addEventListener('click', () => {
            this.toggleChat();
        });

        // Cerrar chat si se hace clic fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.support-chat-widget') && this.isOpen) {
                this.closeChat();
            }
        });
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const toggle = document.getElementById('chatToggle');
        const window = document.getElementById('chatWindow');
        
        toggle.classList.add('active');
        toggle.innerHTML = '<i class="fas fa-times"></i>';
        window.classList.add('active');
        this.isOpen = true;
    }

    closeChat() {
        const toggle = document.getElementById('chatToggle');
        const window = document.getElementById('chatWindow');
        
        toggle.classList.remove('active');
        toggle.innerHTML = '<div class="chat-icon-container"><i class="fas fa-comment-dots"></i><div class="notification-dot"></div></div>';
        window.classList.remove('active');
        this.isOpen = false;
    }
}

// Función para toggle de FAQs del chat
function toggleChatFaq(element) {
    const answer = element.nextElementSibling;
    const isActive = element.classList.contains('active');
    
    // Cerrar todos los FAQs
    document.querySelectorAll('.faq-question-chat').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
    });
    
    // Si no estaba activo, abrirlo
    if (!isActive) {
        element.classList.add('active');
        answer.classList.add('active');
    }
}

// Inicializar el widget cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SupportChatWidget();
}); 