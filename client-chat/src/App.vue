<script setup>
import { io } from 'socket.io-client';

import { onBeforeMount, ref } from 'vue'

const socket = io('http://localhost:3001');

const messages = ref([]);
const messageText = ref('');
const joined = ref(false)
const name = ref('');
const typingDisplay = ref(false)

onBeforeMount(() => {
    socket.emit('findAllMessages', {}, (response) => {
        messages.value = response
    })

    socket.on("message", (message) => {
        console.log({ message })
        messages.value.push(message)
    })

    socket.on('typing', ({ name, isTyping }) => {
        typingDisplay.value = isTyping ? `${name} is typing...` : ''
    })
});
const createMessage = () => {
    socket.emit('createMessage', {
        text: messageText.value
    }, () => {
        messageText.value = ''
    })
}

const join = () => {
    socket.emit('join', { name: name.value }, () => {
        joined.value = true
    })
}

let timeout
const emitTyping = () => {
    socket.emit('typing', { isTyping: true });

    timeout = setTimeout(() => {
        socket.emit('typing', { isTyping: false });
    }, 2000);
}



</script>

<template>

    <div class="chat">
        <div v-if="!joined">
            <form @submit.prevent="join">
                <label>What's your name?</label>
                <input v-model="name" />
                <button type="submit">Send</button>
            </form>
        </div>
        <div class="chat-container" v-else>
            <div class="message-container">
                <div v-for="message in messages">
                    [{{ message.name }}]: {{ message.text }}
                </div>
            </div>
            <div v-if="typingDisplay">
                {{ typingDisplay }}
            </div>
            <div class="message-input">
                <form @submit.prevent="createMessage">
                    <label>Message:</label>
                    <input v-model="messageText" @input="emitTyping" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped>
.chat {
    padding: 20px;
    height: 100vh
}

.chat-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.message {
    flex: 1
}
</style>
