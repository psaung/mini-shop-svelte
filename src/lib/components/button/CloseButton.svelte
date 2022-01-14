<span class="close-btn bg-red-400" />

<style>
	.close-btn {
		position: relative;
	}

	.close-btn:before,
	.close-btn:after {
		position: absolute;
		content: '';
		backface-visibility: hidden;
		width: 4px;
		height: 20px;
		border-radius: 2px;
		background: inherit;
	}

	.close-btn:before {
		transform: rotate(45deg);
	}

	.close-btn:after {
		transform: rotate(-45deg);
	}
</style>
