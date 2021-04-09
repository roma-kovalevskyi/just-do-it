<template>
    <template v-if="tasks.length">
        <div class="card">
            <app-filter v-model="filter"></app-filter>
        </div>
        <h3 class="text-white">Количество задач: {{ tasksCount }}</h3>
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
    <h1 v-else class="text-white center">Задач пока нет</h1>
</template>

<script>
import AppTaskCard from '../components/AppTaskCard.vue'
import AppFilter from '../components/AppFilter.vue'
import AppLoader from '../components/AppLoader.vue'
import AppModal from '../components/AppModal.vue'

export default {
    data() {
        return {
            loading: true,
            filter: 'all',
            modal: false,
            taskToRemove: null
        }
    },
    computed: {
        tasks() {
            return this.$store.getters.tasks;
        },
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
            await this.$store.dispatch('fetchTasks');
            this.loading = false;
        },
        async removeTask(id) {
            await this.$store.dispatch('removeTask', id);
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
