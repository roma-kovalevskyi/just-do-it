<template>
    <div
        v-if="task" 
        class="card"
    >
        <h2>{{ task.title }}</h2>
        <p><strong>Статус</strong>: <app-status :type="task.status" ></app-status></p>
        <p><strong>Дэдлайн</strong>: {{ task.deadline }}</p>
        <p><strong>Описание</strong>: {{ task.description }}</p>
        <div>
            <button 
                class="btn" 
                @click="changeStatus('pending')">
                    Взять в работу
            </button>
            <button 
                class="btn primary" 
                @click="changeStatus('done')">
                    Завершить
            </button>
            <button 
                class="btn danger" 
                @click="changeStatus('cancelled')">
                    Отменить
            </button>
        </div>
    </div>
    <app-loader 
        v-else-if="loading"
    ></app-loader>
    <h3 v-else class="text-white center">
        Задачи с id = <strong>{{ taskId }}</strong> нет.
    </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import AppLoader from '../components/AppLoader'

export default {
    props: ['taskId'],
    data() {
        return {
            loading: true
        }
    },
    computed: {
        task() {
            return this.$store.getters.taskById;
        }
    },
    methods: {
        async fetchTaskById() {
            await this.$store.dispatch('fetchTaskById', this.taskId);
            this.loading = false;
        },
        changeStatus(status) {
            this.$store.dispatch('changeTaskStatus', {
                taskId: this.taskId,
                status
            });
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