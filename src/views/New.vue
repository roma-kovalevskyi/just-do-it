<template>
    <app-loader 
        v-if="loading"
    ></app-loader>
    <form v-else class="card" @submit.prevent="createTask">
        <h1>Create new task</h1>
        <div class="form-control">
            <label for="title">Title</label>
            <input type="text" id="title" v-model.trim="title">
        </div>
        <div class="form-control">
            <label for="date">Deadline</label>
            <input type="date" id="date" v-model="deadline">
        </div>
        <div class="form-control">
            <label for="description">Description</label>
            <textarea id="description" v-model.trim="description"></textarea>
        </div>
        <button class="btn primary" :disabled="!isValidTask">Create</button>
    </form>
</template>


<script>
import axios from 'axios'
import AppLoader from '../components/AppLoader.vue'

export default {
    data() {
        return {
            title: '',
            deadline: '',
            description: '',
            loading: false
        }
    },
    computed: {
        isValidTask() {
            return [this.title, this.deadline, this.description]
                .every(value => value !== '');
        },
        formattedTaskDeadline() {
            return new Date(this.deadline).toLocaleDateString();
        },
        taskStatus() {
            return new Date(this.deadline) < new Date() ? 'canceled': 'queue';
        }
    },
    methods: {
        async createTask() {
            const newTask = {
                status: this.taskStatus,
                title: this.title,
                deadline: this.formattedTaskDeadline,
                description: this.description
            }

            this.loading = true;
			
            try {              
                await axios.post(`${process.env.VUE_APP_FB_URL}tasks.json`, 
                    newTask, { 
                    headers: {
                        'Content-Type': 'application/json'
                    } 
                });
            } catch (e) {
                console.error('Error during adding task to Firebase:', e);
            } finally {
				this.loading = false;
			}
			
            this.$router.push('/');
        },
    },
    components: {
        AppLoader
    }
};
</script>

<style scoped>

</style>