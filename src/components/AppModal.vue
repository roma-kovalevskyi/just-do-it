<template>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h2>Внимание!</h2>
        <p>Вы уверены, что хотите удалить данную задачу?</p>
        <div class="modal-buttons">
            <button class="btn primary" @click="confirmRemove">Да</button>
            <button class="btn" @click="$emit('close')">Нет</button>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['close', 'confirm-remove'],
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {
        confirmRemove() {
            this.$emit('confirm-remove', this.task.id);
            this.$emit('close');
        }
    }
}
</script>

<style>
    
</style>