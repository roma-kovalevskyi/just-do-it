<template>
    <app-loader 
        v-if="loading"
    ></app-loader>
    <form v-else class="card" @submit.prevent="createTask">
        <h1>Создать новую задачу</h1>
        <div class="form-control">
            <label for="title">Название</label>
            <input type="text" id="title" v-model.trim="title">
        </div>
        <div class="form-control">
            <label for="date">Дата дэдлайна</label>
            <input type="date" id="date" v-model="deadline">
        </div>
        <div class="form-control">
            <label for="description">Описание</label>
            <textarea id="description" v-model.trim="description"></textarea>
        </div>
        <button class="btn primary" :disabled="!isValidTask">Создать</button>
    </form>
</template>


<script>
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
            return new Date(this.deadline) < new Date() ? 'cancelled': 'active';
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
            await this.$store.dispatch('addTask', newTask);
            this.loading = false;
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