<script setup>
const props = defineProps({
    id: {
        type: String,
        required: true
    },

    goal: {
        type: String,
        required: true
    }
});
const emit = defineEmits([
    "handleDeleteTodo"
]);
const deleteTodo = (event) => {
    emit("handleDeleteTodo", event.target.value);
}
</script>
<template>
<div class="layout">
    <div>
        <div class="flex justify-between items-center w-72 sm:w-80 bg-gray-200 mt-2 px-2 py-2 rounded-md">
             <h3 class="font-bold">{{props.goal}}</h3>
        <span><i class='bx bxs-trash-alt text-lg text-red-500' @click="$emit('deleteTodo', props.id)"></i></span>
        </div>
    </div>
</div>
</template>