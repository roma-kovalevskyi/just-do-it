<template>
    <div
        v-if="task" 
        class="card"
    >
        <h2>{{ task.title }}</h2>
        <p><strong>Status</strong>: <app-status :type="task.status" ></app-status></p>
        <p><strong>Deadline</strong>: {{ task.deadline }}</p>
        <p><strong>Description</strong>: {{ task.description }}</p>
        <div>
            <button 
                class="btn" 
                @click="changeStatus('doing')">
                    Start doing
            </button>
            <button 
                class="btn primary" 
                @click="changeStatus('completed')">
                    Complete
            </button>
            <button 
                class="btn danger" 
                @click="changeStatus('canceled')">
                    Cancel
            </button>
        </div>
    </div>
    <app-loader 
        v-else-if="loading"
    ></app-loader>
    <h3 v-else class="text-white center">
		There is no task with id <strong>{{ taskId }}</strong>
    </h3>
</template>

<script>
import axios from 'axios'
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'

export default {
    props: ['taskId'],
    data() {
        return {
			task: null,
            loading: true
        }
    },
    methods: {
        async fetchTaskById() {
            try {
                const {data} = await axios.get(`${process.env.VUE_APP_FB_URL}tasks/${this.taskId}.json`);   
				
                if (data) {
                    this.task = {
                        id: this.taskId,
                        ...data
                    }
                }
            } catch (e) {
                console.error(`Error during getting task by ID ${this.taskId} from Firebase:`, e);
            } finally {
            	this.loading = false;
			}
        },
        async changeStatus(status) {
            try {              
                const {data} = await axios.patch(`${process.env.VUE_APP_FB_URL}tasks/${this.taskId}.json`, 
                    { 
                        status
                    }, 
                    { 
                        headers: {
                            'Content-Type': 'application/json'
                        } 
                    }
                );
                
				this.task.status = data.status;
            } catch (e) {
                console.error(`Error during updating task status with ID ${this.taskId} in Firebase:`, e);
            }
        }
    },
    mounted() {
        this.fetchTaskById();
    },
    components: {AppStatus, AppLoader}
}
</script>

<style scoped>

</style>