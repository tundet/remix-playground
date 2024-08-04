variable "project_id" {
  description = "The ID of the Google Cloud project."
}

variable "region" {
  description = "The region to deploy resources."
  default     = "europe-west3" # Frankfurt, Europe
}

variable "bucket_name" {
  description = "The name of the Google Cloud Storage bucket."
}

variable "credentials" {
  description = "Base64 encoded Google Cloud service account credentials."
  type        = string
}
variable "project_id" {
  description = "The ID of the Google Cloud project."
}

variable "region" {
  description = "The region to deploy resources."
  default     = "europe-west3" # Frankfurt, Europe
}

variable "bucket_name" {
  description = "The name of the Google Cloud Storage bucket."
}

variable "credentials" {
  description = "Base64 encoded Google Cloud service account credentials."
  type        = string
}
