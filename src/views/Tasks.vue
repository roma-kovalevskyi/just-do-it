<template>
    <template v-if="tasks.length">
        <div class="card">
            <app-filter v-model="filter"></app-filter>
        </div>
        <h3 class="text-white">{{ filteredTasks.length ? `Tasks count: ${tasksCount}` : 'No such tasks'}}</h3>
        <app-task-card
            v-for="task in filteredTasks" 
            :key="task.id"
            :task="task"
            @remove="openModal"
        ></app-task-card>
        <teleport to="#modal">
            <app-modal 
                v-if="modal"
                :task="taskToRemove"
                @confirm-remove="removeTask"
                @close="closeModal"
            ></app-modal>
        </teleport>
    </template>
    <app-loader 
        v-else-if="loading"
    ></app-loader>
    <h1 v-else class="text-white center">No tasks yet</h1>
</template>

<script>
import axios from 'axios'
import AppTaskCard from '../components/AppTaskCard.vue'
import AppFilter from '../components/AppFilter.vue'
import AppLoader from '../components/AppLoader.vue'
import AppModal from '../components/AppModal.vue'

export default {
    data() {
        return {
			tasks: [],
            loading: true,
            filter: 'all',
            modal: false,
            taskToRemove: null
        }
    },
    computed: {
        filteredTasks() {
            return this.filter === 'all' ? this.tasks: this.tasks.filter(task => task.status === this.filter);
        },
        tasksCount() {
            return this.filteredTasks.length;
        }
    },
    methods: {
        openModal(task) {
            this.taskToRemove = task;
            this.modal = true;
        },
        closeModal() {
            this.taskToRemove = null;
            this.modal = false;
        },
        async fetchTasksHandler() {
            try {
                const {data} = await axios.get(`${process.env.VUE_APP_FB_URL}tasks.json`);

                if (data) {
                    this.tasks = Object.keys(data).map(id => {
                        return {
                            id,
                            ...data[id]
                        }
                    });
                }
            } catch (e) {
                console.error('Error during getting tasks from Firebase:', e);
            } finally {
				this.loading = false;
			}
        },
        async removeTask(id) {
            try {
                await axios.delete(`${process.env.VUE_APP_FB_URL}tasks/${id}.json`);
				this.tasks = this.tasks.filter(task => task.id !== id);
            } catch (e) {
                console.error(`Error during removing task with ID ${id} from Firebase:`, e);
            }
        }
    },
    mounted() {
        this.fetchTasksHandler();
    },
    components: {
        AppTaskCard,
        AppFilter,
        AppLoader,
        AppModal
    }
}
</script>
