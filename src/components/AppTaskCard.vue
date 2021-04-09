<template>
    <div class="card">
        <h2 class="card-title">
            {{ task.title }}
            <app-status :type="task.status"></app-status>
        </h2>
        <p>
            <strong>
            <small>
                {{ task.deadline }}
            </small>
            </strong>
        </p>
        <div class="card-footer">
            <button class="btn primary" @click="open(task.id)">Посмотреть</button>
            <button class="btn danger" @click="remove">Удалить</button>
        </div>
    </div>
</template>

<script>
import AppStatus from './AppStatus.vue'

export default {
    emits: ['remove'],
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        open(id) {
            this.$router.push(`/task/${id}`);
        },
        remove() {
            this.$emit('remove', this.task);
        }
    },
    components: {
        AppStatus
    }
}
</script>

<style>

</style>