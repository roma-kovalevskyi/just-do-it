<template>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h2>Attention!</h2>
        <p>Do you really want to delete this task?</p>
        <div class="modal-buttons">
            <button class="btn primary" @click="confirmRemove">Yes</button>
            <button class="btn" @click="$emit('close')">No</button>
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